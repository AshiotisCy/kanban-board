const DisplayTaskInfo = (columnData, itemObject) => {
    return (
        <div className = 'DisplayTaskInfo'>
            <div className='ColumnParent row'>
                <div className='ColumnParentTitle col-md-5'>
                    <label>Column Parent:</label>
                </div>
                <div className='ColumnParentData col-md-7'>
                    <label>{columnData.name} </label>
                </div>
            </div>
            <div className='TaskName row'>
                <div className='TaskNameTitle col-md-5'>
                    <label>Task Name:</label>
                </div>
                <div className='TaskNameData col-md-7'>
                    <label>{itemObject.taskTitle} </label>
                </div>
            </div>
            <div className='ShortDercription row'>
                <div className='ShortDescriptionTitle col-md-5'>
                    <label>Short Description:</label>
                </div>
                <div className='ShortDescriptionData col-md-7'>
                    <label>{itemObject.shortDescription} </label>
                </div>
            </div>
            <div className='LongDescription row'>
                <div className='LongDescriptionTitle col-md-5'>
                    <label>Long Description:</label>
                </div>
                <div className='LongDescriptionData col-md-7'>
                    <label>{itemObject.longDescription} </label>
                </div>
            </div>
            <div className='CreationTime row'>
                <div className='CreationTimeTitle col-md-5'>
                    <label>Creation Time:</label>
                </div>
                <div className='CreationTimeData col-md-7'>
                    <label>{itemObject.created} </label>
                </div>
            </div>
            <div className='LastModified row'>
                <div className='LastModifiedTitle col-md-5'>
                    <label>Last Modified:</label>
                </div>
                <div className='LastModifiedData col-md-7'>
                    <label>{itemObject.lastModified} </label>
                </div>
            </div>
        </div>
    )
}

export default DisplayTaskInfo