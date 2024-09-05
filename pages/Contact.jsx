export function Contact(){
    function handleFunction(){
        
    }
    return(
        <>
        <form onSubmit={handleFunction}>
            <label>Any question?</label>
            <input type="text" placeholder="enter ur question" required maxLength={250}/>
            <button type="submit">Submit question</button>
        </form>
        </>
    )
}