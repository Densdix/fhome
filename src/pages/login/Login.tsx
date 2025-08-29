import CardContainer from "@/shared/api/ui/Card/CardContainer";
import styles from "./Login.module.scss";
import CardRow from "@/shared/api/ui/Card/CardRow";
import Input from "@/shared/api/ui/Input/Input";
import Button from "@/shared/api/ui/Button/Button";
import { useState } from "react";
import { auth } from "@/shared/api/auth";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const onLogin = () => {
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
          <div className={styles.login__container__form}>
            <CardRow>
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </CardRow>
          <CardRow>
              <Button variant="filled" onClick={onLogin} text="Login" />
            </CardRow>
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default Login;
