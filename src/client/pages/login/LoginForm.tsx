import {useForm} from "@mantine/form";
import {Button, PasswordInput, Stack, TextInput} from "@mantine/core";
import axios from "axios";

const LoginForm = () => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',

        },

        validate: {
            username: (value) => (value.length < 2 ? 'Name must have at' +
                ' least 2 letters' : null),
            password: (value) => (value.length < 8 ? 'Invalid password': null),
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),

        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        console.log(values);
        try {
            const response = await axios.post("/auth/login", values);
            console.log("Login successful:", response);
            // Handle successful login (e.g., store tokens, redirect)
            //Example:
            //localStorage.setItem("token", res.data.token);
            //window.location.replace("/dashboard");

        } catch (error) {
            console.error("Login failed:", error);
            // Handle login error (e.g., display error message)
            if(axios.isAxiosError(error)){
                console.log(error.response?.data);
            }
        }
    };
    return (
        <form
            onSubmit={form.onSubmit(
                (values, event) => {
                    handleSubmit(values).then(() => form.reset());
                    console.log(
                        values, // <- form.getValues() at the moment of submit
                        event // <- form element submit event
                    );
                },
                (validationErrors, values, event) => {
                    console.log(
                        validationErrors, // <- form.errors at the moment of submit
                        values, // <- form.getValues() at the moment of submit
                        event // <- form element submit event
                    );
                }
            )}
        >

    <Stack gap="sm">
            <TextInput
                label="Username"
                placeholder="Username"
                withAsterisk
                key={form.key('username')}
                {...form.getInputProps('username')}
            />
            <PasswordInput
                label="Password"
                placeholder="Password"
                key={form.key('password')}
                {...form.getInputProps('password')}
            />

            <Button type="submit">Login</Button>
            </Stack>
        </form>
    )
}

export default LoginForm
