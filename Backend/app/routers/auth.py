from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.schemas.auth import (
    RegisterSchema,
    LoginSchema
)

from app.models.user import User

from app.config.database import get_db

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

from app.services.activity_service import (
    create_activity
)

router = APIRouter()


# -----------------------------------
# REGISTER
# -----------------------------------

@router.post("/register")

def register_user(

    user: RegisterSchema,

    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Email already registered"
        )

    # -----------------------------------
    # DEFAULT ROLE
    # -----------------------------------

    role = "viewer"

    if user.email == "admin@gmail.com":

        role = "super_admin"

    elif user.email == "analyst@gmail.com":

        role = "analyst"

    new_user = User(

        username=user.username,

        email=user.email,

        password=hash_password(
            user.password
        ),

        role=role
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    create_activity(

        db=db,

        user_id=new_user.id,

        activity_type="User Registration",

        description=f"{new_user.username} registered successfully"  
    )

    return {

        "message":
            "User registered successfully"
    }


# -----------------------------------
# LOGIN
# -----------------------------------

@router.post("/login")

def login_user(

    form_data: OAuth2PasswordRequestForm = Depends(),

    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.username == form_data.username
    ).first()

    if not existing_user:

        raise HTTPException(

            status_code=401,

            detail="Invalid username or password"
        )

    if not verify_password(

        form_data.password,

        existing_user.password
    ):

        raise HTTPException(

            status_code=401,

            detail="Invalid username or password"
        )

    # -----------------------------------
    # JWT TOKEN
    # -----------------------------------

    access_token = create_access_token(

        data={

            "user_id":
                existing_user.id,

            "role":
                existing_user.role,

            "email":
                existing_user.email
        }
    )

    create_activity(

        db=db,

        user_id=existing_user.id,

        activity_type="User Login",

        description=f"{existing_user.username} logged into the system"
    )

    return {

        "access_token":
            access_token,

        "token_type":
            "bearer",

        "role":
            existing_user.role,

        "username":
            existing_user.username
    }