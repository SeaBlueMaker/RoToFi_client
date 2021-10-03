export default function Logo({ type }) {
  let logoImage = "/images/logo_black.png";

  if (type === "white") {
    logoImage = "/images/logo_white.png";
  }

  return (
    <a href="/">
      <img className="logo" src={logoImage} alt="로고" />
    </a>
  );
}
