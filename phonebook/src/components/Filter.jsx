const Filter = ({ method }) => {
    return(
        <div>
            filter shown with <input type="text" onChange={method} />
        </div>
    )
}

export default Filter;
