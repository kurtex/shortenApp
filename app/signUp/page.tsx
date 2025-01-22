
import { redirect } from "next/navigation";
import SignUpForm from "../components/SignUpForm";
import { getUser } from "../serverActions/userActions";


export default async function SignUp () {
    const user = await getUser();

    if (user.user && Object.keys(user.user).length > 0) {
        redirect("/");
    }

    return <SignUpForm />;
}