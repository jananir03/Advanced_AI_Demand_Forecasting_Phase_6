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