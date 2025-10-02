
export default function  ProfileCard(){
  return (
    <div className="profile-card mx-auto my-5 p-3 border rounded-3 bg-light" style={{ maxWidth: "550px" }} >
        <div className="profile-body text-center">
            <img
            src="https://avatars.githubusercontent.com/u/190331346?v=4"
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: "150px", height: "150px" }}
            />

            <h3 className="profile-title">Arnut</h3>
            <p className="text-muted">Owner this website</p>

            <p className="profile-description">
            Hello! My name is Arnut. I created this website to practice my skills 
            and prepare for my future career. I hope you enjoy the gacha simulation. 
            If you have any questions or encounter any issues such as bugs, 
            you can contact me via email or through the Google Form below. 
            Thank you, and have a great day!
            </p>

            <p className="h6">Email: arnut.contact@gmail.com</p>

            <div className="d-flex justify-content-center gap-3 mt-3">
            <p className="h6 mb-0">
                Report a problem:
                <a
                href="https://forms.gle/XNHZhGq1qYZCMrNx5"
                target="_blank"
                rel="noopener noreferrer"
                className="ms-1 btn btn-primary"
                >
                Google Form
                </a>
            </p>
            </div>
        </div>
    </div>
  );
};

