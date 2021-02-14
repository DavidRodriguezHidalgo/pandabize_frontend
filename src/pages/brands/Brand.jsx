import { Link } from "react-router-dom";

const Brand = ({ brand }) => {
  return (
    <div className="brand">
      <Link
        className="card"
        to={`brand/${brand.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img src="http://localhost:3000/bicicle.jpeg" alt="bicicleImage" />
        <div className="brandTitle">
          <h4>{brand.name}</h4>
        </div>
        <div brandPrice>{brand.price} €</div>
      </Link>
    </div>
  );
};

export default Brand;
