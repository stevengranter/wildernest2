import DefaultPaper from "../../features/_shared/components/DefaultPaper";
import LoginForm from "./LoginForm";
import {Title} from "@mantine/core";

const LoginPage = () => {
    return (
        <DefaultPaper>
        <Title order={1}>Login</Title>
        <LoginForm />
        </DefaultPaper>)
}

export default LoginPage
