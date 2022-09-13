import Container from "../../../Design/Container";
import HousesOverview from "../../Shared/Houses/HousesOverview";

const IndexScreen = () => {
    return (
        <>
            <div className="h-screen">
                <div className="relative h-4/5 flex justify-center items-center">
                    <img src="/hero.png" alt="hero" className="absolute w-full h-full object-cover object-center -z-10" />
                    <Container>
                        <h1 className="text-4xl font-bold text-white text-center leading-relaxed lg:w-1/2 m-auto">
                            Helping you find the property of your <span className="underline underline-offset-8 decoration-yellow-500 decoration-[6px]">dreams</span>
                        </h1>
                    </Container>
                </div>
            </div>
            <HousesOverview />
        </>
    )
};

export default IndexScreen;