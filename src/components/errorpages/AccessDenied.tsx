export default function AccessDenied() {
    return (
        <div className="m-auto flex flex-col justify-center">
            <p className="mx-auto mt-6 max-w-2xl text-5xl font-extrabold tracking-tight text-slate-700">Access Denied</p>
            <p className="mx-auto mt-6 max-w-2xl text-2xl tracking-tight text-slate-700">You must be signed in to view this page</p>
        </div>
    );
}
