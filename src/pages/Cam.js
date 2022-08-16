import React from 'react';
import { PageDiv } from '../components/Styled/PageDiv';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as blazeface from '@tensorflow-models/blazeface';
import styled from 'styled-components';

const g_var = {};

const getWebcam = (callback) => {
    try {
        const constraints = {
            video: true,
            audio: false,
        };
        navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
        console.log(err);
        return undefined;
    }
};

const Styles = {
    Video: {
        width: '30vw',
        background: 'rgba(245, 240, 215, 0.5)',
        border: '1px solid green',
    },
    Canvas: {
        width: '30vw',
        background: 'rgba(245, 240, 215, 0.5)',
        border: '1px solid green',
    },
    None: { display: 'none' },
};

const estimateCanvas = async (canvasRef) => {
    const predictions = await g_var.model.estimateFaces(canvasRef, false);
    return predictions;
};

function FaceDetector() {
    const [timer, setTimer] = React.useState(undefined);

    const videoRef = React.useRef(null);
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const initFD = async () => {
            await tf.setBackend('webgl');
            g_var.model = await blazeface.load();

            getWebcam((stream) => {
                videoRef.current.srcObject = stream;
            });
        };
        initFD();
    }, []);

    const drawToCanvas = async () => {
        try {
            const ctx = canvasRef.current.getContext('2d');

            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;

            if (ctx && ctx !== null) {
                if (videoRef.current) {
                    ctx.translate(canvasRef.current.width, 0);
                    ctx.scale(-1, 1);
                    ctx.drawImage(
                        videoRef.current,
                        0,
                        0,
                        canvasRef.current.width,
                        canvasRef.current.height
                    );
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                }

                const preds = await estimateCanvas(canvasRef.current);

                for (let i = 0; i < preds.length; i++) {
                    let p = preds[i];
                    ctx.strokeStyle = '#FF0000';
                    ctx.lineWidth = 5;
                    ctx.strokeRect(
                        p.topLeft[0],
                        p.topLeft[1],
                        p.bottomRight[0] - p.topLeft[0],
                        p.bottomRight[1] - p.topLeft[1]
                    );
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const startOrStop = () => {
        if (!timer) {
            const t = setInterval(() => drawToCanvas(), 200);
            setTimer(t);
        } else {
            clearInterval(timer);
            setTimer(undefined);
        }
    };

    return (
        <PageDiv>
            <div style={{ display: 'flex' }}>
                <Button onClick={() => startOrStop()}>
                    {timer ? '공부 멈추기' : '공부 시작하기'}{' '}
                </Button>
            </div>
            <hr />
            <div style={{ width: '80vw', height: '100vh', padding: '3em' }}>
                <table>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <td>웹캠</td>
                            <td>얼굴 인식</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    style={Styles.Video}
                                />
                            </td>
                            <td>
                                <canvas ref={canvasRef} style={Styles.Canvas} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </PageDiv>
    );
}

export default FaceDetector;

const Button = styled.button`
    width: 500px;
    height: 100px;
    padding: 10px 20px;
    background-color: #ff6347;
    border-radius: 25px;
    font-size: 30px;
`;
