let Text = ({ name }) => {

    let Com = ({ name }) => {
        let a = "안녕하세요, ";
        let b = "누구누구";
        let c = "hello world";

        return (
            <div>
                <p>{a}{name} 입니다.</p>
                <p>{c}</p>
            </div>
        )

    }

    return (
        <>
            <Com name={name} />
        </>
    )
}

export default Text;