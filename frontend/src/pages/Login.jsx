import {useState, useEffect} from "react";
import {FaSignInAlt} from "react-icons/fa";

export default function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {email, password} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("SUBMITTED!")
    };

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Log in
                </h1>
                <p>Log in to your account.</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    {/* EMAIL */}
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={onChange} 
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={onChange} 
                        />
                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-block">
                                Log in
                        </button>
                    </div>


                </form>
            </section>
        </>
    )
}