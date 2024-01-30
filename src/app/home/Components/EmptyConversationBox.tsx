const EmptyConversationBox = () => {
    return ( 
        <div
        className="
        px-4
        py-10
        sm:px-6
        lg:px-8
        h-full
        w-full
        flex
        justify-center
        items-center
        bg-slate-200
        "
        >
            <div className="text-center items-center flex flex-col">
                <h3
                className="
                mt-2
                text-2xl
                text-slate-800"
                >
                    Select an event
                </h3>
            </div>
        </div>
     );
}
 
export default EmptyConversationBox;