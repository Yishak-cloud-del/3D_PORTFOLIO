import Hero from "./sections/hero";
import ShowcaseSection from "./sections/ShowcaseSection.jsx";
import Navbar from "./component/NavBar.jsx";
import FeatureCards from "./sections/FeatureCards.jsx";
import ExperienceSection from "./sections/ExperienceSection.jsx";
import TechStack from "./sections/TechStack.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";



const App = () => {
  return (
    <div className="page-wrapper">
        <Navbar />
        <Hero />
        <ShowcaseSection />
        <FeatureCards />

        <TechStack />

        <Contact />
        <Footer />
    </div>
  )
}

export default App;