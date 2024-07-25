const screenshot = require('screenshot-desktop');
// const cv = require('opencv4nodejs');
import cv from '@techstark/opencv-js';
import * as robot from '@jitsi/robotjs';

// 특정 이미지 파일 로드

// 화면에서 특정 이미지를 찾는 함수
export async function findImageOnScreen(template: cv.Mat) {
  // 스크린샷 캡처
  const imgPath = await screenshot({ format: 'png' });
  const screenImage = cv.imread(imgPath);

  const result = new cv.Mat();

  // 이미지 매칭
  cv.matchTemplate(screenImage, template, result, cv.TM_CCOEFF_NORMED);

  // minMaxLoc 호출 및 결과 저장
  const minVal = new cv.Scalar();
  const maxVal = new cv.Scalar();
  const minLoc = new cv.Point(0, 0);
  const maxLoc = new cv.Point(0, 0);

  cv.minMaxLoc(result, minVal, maxVal, minLoc, maxLoc);
  const maxValNumber = maxVal[0];
  // 매칭된 이미지가 일정 신뢰도 이상일 경우 위치 반환
  if (maxValNumber >= 0.8) {
    console.log({ x: maxLoc.x, y: maxLoc.y });
  } else {
    console.log(null);
  }

  // 메모리 정리
  screenImage.delete();
  result.delete();
}

// 특정 위치에 마우스 클릭
export function clickAt() {
  // Speed up the mouse.
  robot.setMouseDelay(2);
  Object.keys(cv).filter((key) => !key.includes('dynCall'));

  const twoPI = Math.PI * 2.0;
  const screenSize = robot.getScreenSize();
  const height = screenSize.height / 2 - 10;
  const width = screenSize.width;

  for (let x = 0; x < width; x++) {
    const y = height * Math.sin((twoPI * x) / width) + height;
    robot.moveMouse(x, y);
  }
}

// 주기적으로 화면을 확인하고 이미지가 있으면 클릭
