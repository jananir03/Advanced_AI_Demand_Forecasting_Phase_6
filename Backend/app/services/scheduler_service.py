from apscheduler.schedulers.background import (
    BackgroundScheduler
)

scheduler = BackgroundScheduler()


def start_scheduler():

    if not scheduler.running:

        scheduler.start()


def stop_scheduler():

    if scheduler.running:

        scheduler.shutdown()


def get_scheduler_status():

    return scheduler.running


def add_schedule_job(
    job_id,
    func,
    interval_hours=24
):

    scheduler.add_job(

        func=func,

        trigger="interval",

        hours=interval_hours,

        id=str(job_id),

        replace_existing=True
    )


def remove_schedule_job(
    job_id
):

    try:

        scheduler.remove_job(
            str(job_id)
        )

    except:

        pass