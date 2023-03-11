import { SetState } from '@/types/sharedTypes';

export const NumberSelector = ({ value, setValue }: { value: number; setValue: SetState<number> }) => {
    return (
        <div className="custom-number-input h-10 w-32">
            <label htmlFor="custom-input-number" className="w-full text-sm font-semibold text-gray-700">
                Counter Input
            </label>
            <div className="relative mt-1 flex h-10 w-full flex-row rounded-lg bg-transparent">
                <button
                    data-action="decrement"
                    className=" h-full w-20 cursor-pointer rounded-l bg-gray-300 text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700"
                >
                    <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                    type="number"
                    className="text-md md:text-basecursor-default flex w-full items-center bg-gray-300 text-center font-semibold text-gray-700 outline-none hover:text-black focus:text-black  focus:outline-none"
                    name="custom-input-number"
                    value="0"
                ></input>
                <button
                    data-action="increment"
                    className="h-full w-20 cursor-pointer rounded-r bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-700"
                >
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>
            </div>
        </div>
    );
};