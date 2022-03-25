import {useState, useEffect} from "react";
import {FaUser} from "react-icons/fa";

export default function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    })

    const {name, email, password, password2} = formData;

    const onChange = (e) => {
        console.log(e.target.value);
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("SUBMITTED!")
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Create your account.</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    {/* NAME */}
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Name"
                            onChange={onChange} 
                        />
                    </div>

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

                    {/* PASSWORD2 */}
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="password2"
                            name="password2"
                            value={password2}
                            placeholder="Confirm password"
                            onChange={onChange} 
                        />
                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-block">
                                Register
                        </button>
                    </div>


                </form>
            </section>
        </>
    )
}