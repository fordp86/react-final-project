import { Container, Row, Col } from "react-bootstrap"

function About(){
    return(
        <Container>
            <Row className="col-md-12 py-50">
                <Col md={6}>
                    <h1>About US</h1>
                    <p>Pig boudin jowl fatback hamburger burgdoggen kevin pork loin ham drumstick leberkas rump cupim flank tri-tip. Shoulder short ribs pork flank. Swine biltong pork chop burgdoggen strip steak tri-tip. Pork pork chop flank t-bone ball tip. Turkey sirloin shoulder cow tri-tip short ribs pork loin chislic andouille cupim landjaeger kevin fatback.</p>

                    <p>Fatback ham jowl burgdoggen, turkey andouille ribeye pig short ribs pastrami strip steak turducken. Chicken t-bone spare ribs swine, jowl frankfurter shank shankle cupim ball tip short loin bacon pork belly beef. Sausage ribeye strip steak, tail pork chop doner turkey kevin andouille shoulder biltong pork loin cupim landjaeger tenderloin. Short ribs venison kevin meatloaf corned beef landjaeger. Pork belly short loin capicola, shoulder chuck kevin shank jerky hamburger sirloin. Pancetta porchetta andouille prosciutto chuck boudin meatloaf venison shank.</p>
                </Col>
                <Col md={6}>
                    <img src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt="about shopy guy" className="img-fluid" />
                </Col>
            </Row>
        </Container>
    )
}

export default About