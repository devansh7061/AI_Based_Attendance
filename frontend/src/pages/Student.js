import React, { useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { useSelector, useDispatch } from "react-redux";
import { getStudents } from "../actions/students";
import { addRecord } from "../actions/records";

function Student() {
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();
  console.log(students);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [studentRecord, setStudentRecord] = useState({ name: "", desc: "" });
  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();
  useEffect(() => {
    dispatch(getStudents());
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, [dispatch]);
  const handleClick = () => {
    // e.preventDefault();
    console.log("clicked");
    dispatch(addRecord(studentRecord));
    console.log(studentRecord);
    setStudentRecord({ name: "", desc: "" });
    alert("Your attendance has been marked!");
    videoRef.current.play();
  };
  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };
  const loadLabeledImages = () => {
    return Promise.all(
      students.map(async (student) => {
        const descriptions = [];
        console.log(student.img);
        const img = await faceapi.fetchImage(student.img);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        console.log(detections);
        descriptions.push(detections.descriptor);
        console.log(descriptions);
        return new faceapi.LabeledFaceDescriptors(student.name, descriptions);
      })
    );
  };
  const handleVideoOnPlay = async () => {
    const labeledDescriptors = await loadLabeledImages();
    console.log(labeledDescriptors);
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7);
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, videoWidth, videoHeight);
        const results = resizedDetections.map((d) => {
          console.log(faceMatcher.findBestMatch(d.descriptor));
          return faceMatcher.findBestMatch(d.descriptor);
        });
        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box;
          canvasRef &&
            canvasRef.current &&
            faceapi.draw.drawDetections(canvasRef.current, [box]);
          if (result._label !== "unknown") {
            closeWebcam();
            setFaceDetected(true);
            students.map((student) => {
              if (student.name == result._label) {
                setStudentRecord({ name: student.name, desc: student.desc });
              }
            });
          }
        });
      }
    }, 10);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };
  return (
    <div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        {captureVideo && modelsLoaded ? (
          <button
            onClick={closeWebcam}
            style={{
              cursor: "pointer",
              backgroundColor: "green",
              color: "white",
              padding: "15px",
              fontSize: "25px",
              border: "none",
              borderRadius: "10px",
            }}
          >
            Close Webcam
          </button>
        ) : (
          <>
            <button
              onClick={startVideo}
              style={{
                cursor: "pointer",
                backgroundColor: "green",
                color: "white",
                padding: "15px",
                fontSize: "25px",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Open Webcam
            </button>
            <div className={faceDetected?"student-details": "hidden"}>
              <p>{studentRecord.name}</p>
              <button style={{ margin: "30px" }} onClick={handleClick}>
                Confirm
              </button>
              <button onClick={() => videoRef.current.play()}>Try again</button>
            </div>
          </>
        )}
      </div>
      {captureVideo ? (
        modelsLoaded ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <video
                ref={videoRef}
                height={videoHeight}
                width={videoWidth}
                onPlay={handleVideoOnPlay}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute" }} />
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default Student;
