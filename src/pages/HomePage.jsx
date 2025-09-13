import { Link } from "react-router-dom";

export default function HomePage(){
    return(
        <div>
            <h1 className="text-center text-light my-3">Select Gacha Type</h1>
            <div className="row flex-fill g-1 mx-3">
                <div className="col-md-6 my-3">
                    <Link className="text-decoration-none" to="/random-rangers">
                    <div className="card text-center bg-light mx-3" style={{ width: "auto"}}>
                        <div className="card-img-top" style={{ height: "310px", overflow: "hidden" }}>
                            <img 
                            src="src/assets/gacha-cover-image/rangers-banner.jpg" 
                            alt="Rangers Gacha Banner" 
                            className="w-100" 
                            style={{ height: "100%", objectFit: "cover" }}
                            />
                        </div>
                        <div className="card-body d-flex flex-column justify-content-between" style={{ minHeight: "100px", padding: "0.5rem" }}>
                            <div>
                            <h5 className="card-title text-start my-1 mx-1">Gacha Rangers 6+1 Click!</h5>
                            <p className="card-text text-start my-1 mx-1" style={{ fontSize: "0.85rem" }}>
                                The new rangers are waiting for you!
                            </p>
                            </div>
                            <div className="d-flex justify-content-end mt-1">
                                <span className="btn btn-primary btn-sm m-1">Random</span>
                            </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="col-md-6 my-3">
                    <Link className="text-decoration-none" to="/random-gears">
                    <div className="card text-center bg-light mx-3" style={{ width: "auto"}}>
                        <div className="card-img-top" style={{ height: "310px", overflow: "hidden" }}>
                            <img 
                            src="src/assets/gacha-cover-image/gears-banner.jpg" 
                            alt="Gears Gacha Banner" 
                            className="w-100" 
                            style={{ height: "100%", objectFit: "cover" }}
                            />
                        </div>
                        <div className="card-body d-flex flex-column justify-content-between" style={{ minHeight: "100px", padding: "0.5rem" }}>
                            <div>
                            <h5 className="card-title text-start my-1 mx-1">Gacha Gears 5+1 Click!</h5>
                            <p className="card-text text-start my-1 mx-1" style={{ fontSize: "0.85rem" }}>
                                The new gears are waiting for you!
                            </p>
                            </div>
                            <div className="d-flex justify-content-end mt-1">
                                <span className="btn btn-primary btn-sm m-1">Random</span>
                            </div>
                        </div>
                    </div>
                    </Link>
                </div>
            </div>
            <footer className="bg-warning text-center text-muted py-3 mt-3">
                <div className="container">
                    <p className="mb-2" style={{ fontSize: "0.9rem" }}>
                    GachaMe is a LINE Rangers gacha simulation website created 
                    for entertainment purposes only. This website uses some 
                    information from the {" "}  
                    <a href="https://rangers.lerico.net/en/rangers-book" target="_blank" 
                    rel="noopener noreferrer" className="text-decoration-underline text-primary">
                    LINE Rangers Handbook </a> and the LINE Rangers game. 
                    It is not an official website for the LINE Rangers game.
                    </p>
                </div>
            </footer>
        </div>
    );
}