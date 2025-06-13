
const FooterComponent = () => {
    return (
        <>
            <style>
                {`
                
                `}
            </style>

            <footer className="villa-footer">
                <div className="footer-top">
                    <div className="footer-columns">
                        <div>
                            <h4>VillaVista</h4>
                            <p>Luxury villa stays that feel like home. Escape, relax, and enjoy.</p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span className="footer-text">
                        © 2025 VillaVista. All rights reserved. {new Date().getFullYear()}
                    </span>
                </div>
            </footer>
        </>
    );
};

export default FooterComponent;
