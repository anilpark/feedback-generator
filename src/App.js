import React, {useState, useRef} from "react";
import ReactToPrint from "react-to-print";
import qr from '../src/images/qr.png'

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function App() {
    const printRef = useRef(null);
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [teacher, setTeacher] = useState('');
    const [bio, setBio] = useState('');
    const [levelIndex, setLevelIndex] = useState(0);
    const [progress, setProgress] = useState(50);
    const [improved, setImproved] = useState(['']);
    const [errors, setErrors] = useState(['']);
    const [recommendations, setRecommendations] = useState(['']);
    const [hours, setHours] = useState(0);
    const [testResult, setTestResult] = useState(50);

    const imagePickHandler = (changeEvent) => {
        const selectedFile = changeEvent.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            setImage([event.target.result, changeEvent.target.files[0]]);
        };

        reader.readAsDataURL(selectedFile);
    };

    const onMultiInputChange = (setState, index, value) => {
        setState(prev => {
            const result = [];
            for(let i = 0; i < prev.length; i++){
                let newValue = prev[i];
                if(i === index){
                    newValue = value;
                }
                result.push(newValue);
            }

            return result;
        })
    }

    return (
        <>
            <div className="container">
                <div className="leftPart">
                    <div className="formContainer">
                        <div className='inputItem'>
                            <p>Picture</p>
                            <input
                                style={{
                                    maxWidth: "300px",
                                }}
                                type="file"
                                accept="image/*"
                                onChange={imagePickHandler}
                            />
                        </div>

                        <div className='inputItem'>
                            <p>Student's name</p>
                            <input
                                style={{
                                    maxWidth: "300px",
                                }}
                                value={name}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='inputItem'>
                            <p>Info</p>
                            <textarea
                                style={{
                                    maxWidth: "300px",
                                }}
                                value={bio}
                                onChange={(e) => {
                                    if(e.target.value.length <= 700){
                                        setBio(e.target.value);
                                    }else {
                                        alert('Max length for this info is 700 characters, allo')
                                    }
                                }}
                            />
                        </div>

                        <div className='inputItem'>
                            <p>Teacher</p>
                            <input
                                value={teacher}
                                style={{
                                    maxWidth: "300px",
                                }}
                                type="text"
                                onChange={(e) => setTeacher(e.target.value)}
                            />
                        </div>

                        <div className='inputItem'>
                            <p>Current level - {levels[levelIndex]}</p>
                            <input
                                value={levelIndex}
                                style={{
                                    maxWidth: "300px",
                                }}
                                min={0}
                                max={5}
                                type="range"
                                onChange={(e) => setLevelIndex(+e.target.value)}
                            />
                        </div>

                        <div className='inputItem'>
                            <p>Progress - {progress}%</p>
                            <input
                                value={progress}
                                style={{
                                    maxWidth: "300px",
                                }}
                                min={0}
                                max={100}
                                type="range"
                                onChange={(e) => setProgress(+e.target.value)}
                            />
                        </div>

                        <div className='inputItem'>
                            <p>Hours - {isNaN(hours) ? 0 : hours}h</p>
                            <input
                                value={hours}
                                style={{
                                    maxWidth: "300px",
                                }}
                                min={0}
                                max={1000}
                                type="number"
                                onChange={(e) => setHours(parseInt(e.target.value))}
                            />
                        </div>

                        <div className='inputItem'>
                            <p>Test result - {isNaN(testResult) ? 0 : testResult}/100</p>
                            <input
                                value={testResult}
                                style={{
                                    maxWidth: "300px",
                                }}
                                min={0}
                                max={1000}
                                type="number"
                                onChange={(e) => setTestResult(parseInt(e.target.value))}
                            />
                        </div>

                        <div className='inputItem'>
                            <p>Improved</p>
                            {improved.map((item, index, arr) => <div className='multiInput'>
                                <input
                                    value={improved[index]}
                                    style={{
                                        maxWidth: "300px",
                                        marginBottom: '5px'
                                    }}
                                    type="text"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        onMultiInputChange(setImproved, index, value);
                                    }}
                                />
                                {index !== 0 && <button className='red' onClick={() => {
                                    setImproved(prev => [...prev.filter((item, i) => i !== index)])
                                }
                                }>-</button>}
                            </div>)}

                            <button className='green' onClick={() => {
                                setImproved(prev => [...prev, ''])
                            }}>+</button>
                        </div>

                        <div className='inputItem'>
                            <p>Errors</p>
                            {errors.map((item, index, arr) => <div className='multiInput'>
                                <input
                                    value={errors[index]}
                                    style={{
                                        maxWidth: "300px",
                                        marginBottom: '5px'
                                    }}
                                    type="text"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        onMultiInputChange(setErrors, index, value);
                                    }}
                                />
                                {index !== 0 && <button className='red' onClick={() => {
                                    setErrors(prev => [...prev.filter((item, i) => i !== index)])
                                }
                                }>-</button>}
                            </div>)}

                            <button className='green' onClick={() => {
                                setErrors(prev => [...prev, ''])
                            }}>+</button>
                        </div>


                        <div className='inputItem'>
                            <p>Recommendations</p>
                            {recommendations.map((item, index, arr) => <div className='multiInput'>
                                <input
                                    value={recommendations[index]}
                                    style={{
                                        maxWidth: "300px",
                                        marginBottom: '5px'
                                    }}
                                    type="text"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        onMultiInputChange(setRecommendations, index, value);
                                    }}
                                />
                                {index !== 0 && <button className='red' onClick={() => {
                                    setRecommendations(prev => [...prev.filter((item, i) => i !== index)])
                                }
                                }>-</button>}
                            </div>)}

                            <button className='green' onClick={() => {
                                setRecommendations(prev => [...prev, ''])
                            }}>+</button>
                        </div>
                    </div>
                </div>

                <div className="rightPart">
                    <ReactToPrint
                        trigger={() => <button className='blue'>Print</button>}
                        content={() => printRef.current}
                    />

                    <div ref={printRef} className='printContainer'>
                        <div className="printLeft">
                            <div className="imgContainer">
                                <img src={image && image[0]} alt=""/>
                            </div>

                            <div className="leftWrapper">
                                <p className='studentName'>Student: {name}</p>

                                <div className="level">
                                    <p>{levels[levelIndex]}</p>
                                    <div className="progressOuter">
                                        <div style={{
                                            width: progress + '%',
                                        }} className="progressInner"></div>
                                    </div>
                                    <p>{levels[levelIndex + 1] ?? 'OMG'}</p>
                                </div>

                                <ul style={{
                                    marginLeft: '30px',
                                }}>
                                    <li>
                                        Hours: {hours}
                                    </li>
                                    <li>
                                        Test result: {testResult}/100
                                    </li>

                                </ul>
                                <p className='studentsProfile'>{name}'s profile</p>
                                <p className='bio'>
                                    {bio}
                                </p>
                            </div>
                        </div>

                        <div className="printRight">
                            <div className="rightWrapper">
                                <div className="teachersFeedback">
                                    <p>Feedback from teacher <span className="teacher">{teacher}</span></p>
                                </div>

                                <div className="improveWrapper">
                                    <div className='improvedBlock'>
                                        <img src="https://img.icons8.com/external-filled-color-icons-papa-vector/78/null/external-Voice-Marketing-feedback-and-market-filled-color-icons-papa-vector.png"/>
                                        <p>Improved:</p>
                                    </div>

                                    <ul className='list'>
                                        {improved.map((item) => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>

                                <div className="errorsWrapper">
                                    <div className='errorsBlock'>
                                        <img src="https://img.icons8.com/nolan/64/circular-arrows.png"/>
                                        <p>Common errors:</p>
                                    </div>

                                    <ul className='list'>
                                        {errors.map((item) => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>


                                <div className="recommendationsWrapper">
                                    <div className='recommendationsBlock'>
                                        <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-recommendation-literature-flaticons-lineal-color-flat-icons.png" alt=''/>                                        <p>Recommendations:</p>
                                    </div>

                                    <ul className='list'>
                                        {recommendations.map((item) => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className='bottomBlock'>
                                <a href="https://instagram.com/eng_fakultet"><img className='qr' src={qr} alt=''/></a>
                            </div>

                        </div>

                    </div>


                </div>
            </div>
        </>
    );
}

export default App;
