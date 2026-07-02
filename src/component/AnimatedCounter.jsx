
import {counterItems} from "../constants/index.js";


const AnimatedCounter = () => {
    return (
        <div id="counter" className="padding-x-lg xl:mt-0 mt-32">
            <div className="mx-auto grid-4-cols">
                {counterItems.map((item) => (
                    <div
                        key={item.label}
                        className="bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-950 border border-cyan-800/40 rounded-xl p-10 flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/80"
                    >
                        <div className="counter-number text-cyan-400 text-5xl font-extrabold mb-2 tracking-tight">
                            {item.value}
                        </div>
                        <div className="text-slate-300 text-base font-medium tracking-wide">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AnimatedCounter