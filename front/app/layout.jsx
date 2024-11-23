import '@styles/globals.css';
import Template from '../components/Template';
import NavbarMenu from '@components/NavbarMenu';

const RootLayout = ({ children }) => {
    return (
        <html lang="en"> {/* Добавление тега <html> */}
            <head>
                <title>My App</title>
            </head>
            <body>
                <div className='app'>
                    <header className='header'>
                        {/* <NavbarM /> */}
                    </header>
                    <main style={{ position: 'relative' }}>
                        <NavbarMenu />
                        <Template>{children}</Template>
                    </main>
                </div>
            </body>
        </html>
    );
}
export default RootLayout;
