import { useEffect, useState } from "react";

export default function ThemeSelect() {
  const themes = ["morning", "afternoon", "midnight"];

  const [ selected, setSelected ] = useState(themes[0]);

  const handleChangeSelect = (event) => {
    const selectedTheme = event.target.value;

    localStorage.setItem("theme", selectedTheme);
    setSelected(selectedTheme);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const initialTheme = "theme--morning";

    if (!theme) {
      localStorage.setItem("theme", initialTheme);
      setSelected(initialTheme);
      document.body.className = initialTheme;
    }
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || themes[0];

    setSelected(theme);
    document.body.className = selected;
  }, [selected]);

  return (
    <select
      variant="sort"
      className="button--brown"
      onChange={handleChangeSelect}
      value={selected}
    >
      {themes.map((theme) => (
        <option
          value={`theme--${theme}`}
          key={theme}
        >
          {theme}
        </option>
      ))}
    </select>
  );
}
