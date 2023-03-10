import './styles.scss'


export default function HeroLoading() {

    return (
        <>
            <div
                className="hero p-5 text-center bg-image"
            >
                <div className="hero-content mask">
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="hero-text-wrapper-loading">
                            <span className="placeholder-glow justify-content-center align-items-center">
                                <h1 className="mb-3 placeholder w-25 d-block mx-auto rounded"></h1>
                            </span>

                            <span className="placeholder-glow justify-content-center align-items-center">
                                <h4 className="mb-3 placeholder w-75 d-block mx-auto rounded"></h4>
                                <h4 className="mb-3 placeholder w-50 d-block mx-auto rounded"></h4>
                            </span >
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
