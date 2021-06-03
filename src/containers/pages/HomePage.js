import React from "react";
import { Link } from "react-router-dom";
import hero1 from "../../images/heroImages/2560px-food_basket.jpeg";
import hero2 from "../../images/heroImages/fork-2756381_1280.png";
import hero3 from "../../images/heroImages/pexels-photo-1095550.png";
import hero4 from "../../images/heroImages/benefits-of-our-grocery-delivery.png";
import iconRecipe from "../../images/icons/recipes-recipe-pngrepo-com.png";
import iconGrocery from "../../images/icons/shop-338-454916.png";

const HomePage = () => {
  return (
    <div className="landing-page">
      <header>
        <img src={hero1} alt="hero1" />
        <div className="title">Welcome to Cook Yourself</div>
      </header>

      <section className="why-section">
        <h2>Why Cook Yourself?</h2>
        <article>
          <div className="why-card">
            <img src={iconGrocery} alt="grocery-icon" className="icons" />
            <p>Online Grocery. No need to go to supermarket</p>
          </div>
          <div className="why-card">
            <img src={iconRecipe} alt="recipe-icon" className="icons" />
            <p>Sharing food recipes </p>
          </div>
        </article>
        <img src={hero2} alt="hero2" className="hero2" />
      </section>

      <section className="recipe-section">
        <img src={hero3} alt="hero3" className="hero3" />
        <div className="right-side">
          <h2>Share dishes that you like. Discover new taste.</h2>
          <Link to="/recipes">
            <button type="button" className="recipe-button">
              Discover
            </button>
          </Link>
        </div>
      </section>

      <section className="grocery-section">
        <div className="left-side">
          <h2>Buy ingredient online.</h2>
          <button type="button" className="grocery-button">
            Go to shop
          </button>
        </div>
        <img src={hero4} alt="hero4" className="hero4" />
      </section>
    </div>
  );
};

export default HomePage;
