import SignOutButton from './components/SignOutButton';
import { getUser } from './serverActions/userActions';
import LoginLink from './components/LoginLink';
import HomeLink from './components/HomeLink';

export async function NavLinks () {

    const data = await getUser();

    return (
        <nav className='flex flex-row items-center justify-between gap-4 p-3 font-semibold w-[1000px] m-auto'>

            <HomeLink />

            {data.user === null ?
                <LoginLink /> : <SignOutButton />}

        </nav>
    );
}