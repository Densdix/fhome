import CardContainer from "@/shared/ui/Card/CardContainer";
import styles from "./Login.module.scss";
import CardRow from "@/shared/ui/Card/CardRow";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import { useState } from "react";
import { auth } from "@/shared/api/auth";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  
  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth(email).then((res) => {
      if (res) {
        navigate("/");
      }
    });
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <CardContainer>
          <form onSubmit={onLogin} className={styles.login__container__form}>
            <CardRow>
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </CardRow>
          <CardRow>
              <Button variant="filled" text="Login" />
            </CardRow>
          </form>
        </CardContainer>
      </div>
    </div>
  );
};

export default Login;
