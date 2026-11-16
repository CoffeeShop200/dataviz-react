import logo from "../assets/logo_collectivite.webp"
import { Link } from "react-router-dom"
function Footer() {
    return (
        <footer className="footer">
            <div className="container">

                <div className="footer-main">
                    <a className="footer-logo" href="https://www.isula.corsica/" target="_blank" rel="noopener noreferrer">
                        <img src={logo} alt="Logo de la Collectivité de Corse" />
                    </a>
                    <div className="footer-contact">
                        <p className="footer-title">CULLETTIVITÀ DI CORSICA – COLLECTIVITÉ DE CORSE</p>
                        <p>
                            DGA di a stratégia, di l’innuvazione è di a trasfurmazione<br />
                            Direzzione di a Trasfurmazione è di l’Accuciamente Numericu
                        </p>
                        <p>22, corsu Grandval – 20000 Aiacciu</p>
                        <a href="mailto:datacorsica@isula.corsica">datacorsica@isula.corsica</a>
                    </div>
                    <div className="footer-source">
                        <span>Source des données</span>
                        <a href="https://data.corsica" target="_blank" rel="noopener noreferrer">
                            data.corsica
                        </a>
                        <p>Jeu de données « Morts pour la France », récupéré en direct via l’API.</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} Mémoire de Corse</span>
                    <span className="footer-legal">
                        <Link to="/mentions">Mentions Légales</Link>
                        <a href="https://data.corsica/accessibility">Accessibilité</a>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;