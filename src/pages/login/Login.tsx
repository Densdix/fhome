import CardContainer from "@/shared/ui/Card/CardContainer";
import CardRow from "@/shared/ui/Card/CardRow";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import styles from "./Login.module.scss";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/shared/api/requestSetup";
import { useAuth } from "@/shared/hooks/useAuth";
import { Loader } from "@/shared/ui/Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, setError } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      const from = location.state?.from?.pathname || "/organizations";
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    const success = await login(email.trim());

    if (success) {
      const from = location.state?.from?.pathname || "/organizations";
      navigate(from, { replace: true });
    }
  };

  return (
    <div className={styles.login}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <CardContainer>
          <form onSubmit={handleSubmit}>
            <CardRow>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </CardRow>
            {error && <div className={styles.login__error}>{error}</div>}
            <CardRow>
              {isLoading ? (
                <div className={styles.login__loader}>
                  <Loader size="medium" />
                </div>
              ) : (
                <Button
                  variant="filled"
                  text="Login"
                  type="submit"
                  disabled={isLoading}
                />
              )}
            </CardRow>
          </form>
        </CardContainer>
      </div>
    </div>
  );
};

export default Login;
