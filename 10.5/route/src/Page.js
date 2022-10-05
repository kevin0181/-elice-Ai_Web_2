import { useParams } from "react-router-dom";

let Page = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>{id}번 Page 입니다.</h1>
        </div>
    )
}

export default Page;