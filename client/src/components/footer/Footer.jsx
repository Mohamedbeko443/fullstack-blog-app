import "./footer.css"

const styles = {
    color: "var(--white-color)",
    fontSize: "21px",
    backgroundColor: "var(--blue-color)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px"
}

export default function Footer() {
    return (
        <footer style={styles}>
            Copyright 2025 &copy;
        </footer>
    )
}
