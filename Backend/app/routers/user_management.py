from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.config.database import (
    get_db
)

from app.models.user import User

from app.schemas.user_management_schema import (
    ProfileUpdateSchema,
    PasswordResetSchema
)

from app.core.auth import (
    get_current_user
)

from app.core.security import (
    hash_password
)

from app.schemas.user_schema import UserCreate


from app.core.permissions import (
    require_roles
)

router = APIRouter(

    prefix="/user-management",

    tags=["User Management"]
)

@router.get("/profile")
def get_profile(

    current_user: User = Depends(
        get_current_user
    )
):

    return {

        "id":
            current_user.id,

        "username":
            current_user.username,

        "email":
            current_user.email,

        "role":
            current_user.role,

        "status":
            current_user.is_active
    }

@router.put("/profile")
def update_profile(

    payload: ProfileUpdateSchema,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    current_user.username = (
        payload.username
    )

    current_user.email = (
        payload.email
    )

    db.commit()

    return {

        "message":
            "Profile updated successfully"
    }

@router.post("/reset-password")
def reset_password(

    payload: PasswordResetSchema,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    current_user.password = (

        hash_password(
            payload.new_password
        )
    )

    db.commit()

    return {

        "message":
            "Password reset successfully"
    }

@router.put(
    "/{user_id}/status"
)
def toggle_status(

    user_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    user = db.query(
        User
    ).filter(

        User.id == user_id

    ).first()

    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"
        )

    user.is_active = (

        "inactive"

        if user.is_active == "active"

        else "active"
    )

    db.commit()

    return {

        "status":
            user.is_active
    }

# -----------------------------------
# GET ALL USERS
# -----------------------------------

@router.get("/users")
def get_all_users(

    db: Session = Depends(get_db),

    current_user: User = Depends(

        require_roles([
            "super_admin"
        ])
    )
):

    users = db.query(
        User
    ).all()

    result = []

    for user in users:

        result.append({

            "id":
                user.id,

            "username":
                user.username,

            "email":
                user.email,

            "role":
                user.role,

            "status":
                user.is_active
        })

    return result

# -----------------------------------
# CREATE USER
# -----------------------------------

@router.post("/users")
def create_user(

    payload: UserCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(

        require_roles([
            "super_admin"
        ])
    )
):

    existing_user = db.query(
        User
    ).filter(

        User.username ==
        payload.username

    ).first()

    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Username already exists"
        )

    new_user = User(

        username=
            payload.username,

        email=
            payload.email,

        password=
            hash_password(
                payload.password
            ),

        role=
            payload.role,

        is_active=
            "active"
    )

    db.add(
        new_user
    )

    db.commit()

    db.refresh(
        new_user
    )

    return {

        "message":
            "User created successfully",

        "user_id":
            new_user.id
    }


@router.put("/users/{user_id}/toggle-status")
def toggle_user_status(

    user_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        require_roles(["super_admin"])
    )
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.is_active == "active":

        user.is_active = "inactive"

    else:

        user.is_active = "active"

    db.commit()

    db.refresh(user)

    return {
        "message": "Status updated",
        "status": user.is_active
    }
# -----------------------------------
# CHANGE ROLE
# -----------------------------------

@router.put(
    "/users/{user_id}/role"
)
def change_role(

    user_id: int,

    role: str,

    db: Session = Depends(get_db),

    current_user: User = Depends(

        require_roles([
            "super_admin"
        ])
    )
):

    allowed_roles = [

        "super_admin",

        "analyst",

        "viewer"
    ]

    if role not in allowed_roles:

        raise HTTPException(

            status_code=400,

            detail="Invalid role"
        )

    user = db.query(
        User
    ).filter(

        User.id == user_id

    ).first()

    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"
        )

    user.role = role

    db.commit()

    return {

        "message":
            "Role updated successfully",

        "role":
            role
    }