import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";


export default function HomePage(){
    return (
        <Container style={{marginTop:'7rem'}}>
            <h1>خانه</h1>
            <h3>برای دیدن لیست فعالیت ها <Link to='/activities'>کلیک</Link> کنید</h3>
        </Container>
    )
}