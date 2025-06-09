import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl mt-2">Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
                Go Home
            </Link>
        </div>
    );
}
