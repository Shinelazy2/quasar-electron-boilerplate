import { CommonCode } from '@/types/commonCode.type';
import dayjs from 'dayjs';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
    sourceDirPath: '',
    targetDirPath: '',
    images: [] as string[], // images 추가
    lines: [] as string[],
    sourceImagePath: '',
    targetImagePath: '',
    transferInterval: null as NodeJS.Timer | null,
    logs: [] as string[],
    transferSpeed: 500,
    isToggle: 'start' as string,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async setSettings() {
      await this.setGlobalDirPath();
      await this.setGlobalImages();
    },
    async setGlobalDirPath() {
      const pathCommonCode = (await window.api.getCommonCode(1000)).data;

      pathCommonCode.forEach((path) => {
        path.CD_ABBR === 'source' ? (this.sourceDirPath = path.DATA_1) : '';
        path.CD_ABBR === 'target' ? (this.targetDirPath = path.DATA_1) : '';
        path.CD_ABBR === 'speed' ? (this.transferSpeed = parseInt(path.DATA_1)) : '';
      });
    },
    async getImagePath() {
      if (this.images.length === 0) {
        throw Error('폴더에 이미지가 없습니다.');
      }
      const randomIndex = Math.floor(Math.random() * this.images.length);
      const randomImage = this.images[randomIndex];
      const sourceImagePath = this.sourceDirPath + '\\' + randomImage;
      const yyyymmdd = dayjs().format('YYYYMMDD');
      const hhmmss = dayjs().format('HHmmss');
      const carPlateNumber = this.getReplacePath(randomImage);
      const getRandomeLine = this.getRandomLine();
      const reNameImage = `${getRandomeLine}_${yyyymmdd}_${hhmmss}_${carPlateNumber}.jpg`;
      const targetImagePath = this.targetDirPath + '\\' + reNameImage;
      return {
        sourceImagePath,
        targetImagePath,
      };
    },
    async setGlobalImages() {
      this.images = await window.api.getSourceImageList(this.sourceDirPath);
      console.log('🚀 ~ setGlobalImages ~ this.images:', this.images);
      const getLines = (await window.api.getCommonCode(1001)).data;
      getLines.forEach((commonCode: CommonCode) => {
        this.lines.push(commonCode.DATA_1);
      });
    },

    getReplacePath(randomImage: string) {
      const test = randomImage.split('_');
      const carPlateNumber = test[test.length - 2];
      return carPlateNumber;
    },
    getRandomLine() {
      const randomLineIndex = Math.floor(Math.random() * this.lines.length);
      const randomLine = this.lines[randomLineIndex];
      return randomLine;
    },
    getLogDate() {
      const logDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
      return logDate;
    },
    async startTransferImage() {
      if (this.transferInterval) return;
      this.isToggle = 'start';
      const logDate = this.getLogDate();
      this.logs.push(`[${logDate}] 사진생성을 시작합니다.`);

      const transferImage = async () => {
        try {
          const { sourceImagePath, targetImagePath } = await this.getImagePath();
          const isCopyed = await window.api.copyImage(sourceImagePath, targetImagePath);
          if (isCopyed) {
            this.logs.push(`[${logDate}]_[사진생성]_${targetImagePath}`);
          } else {
            this.logs.push(`[${logDate}]_[생성실패]_${targetImagePath}`);
          }
          if (this.logs.length > 50) {
            this.logs.shift();
          }
          if (this.transferInterval) {
            setTimeout(transferImage, this.transferSpeed);
          }
        } catch (error) {
          console.error(error);
        }
      };

      this.transferInterval = setTimeout(transferImage, this.transferSpeed);
    },
    stopTransferImage() {
      if (this.transferInterval) {
        this.isToggle = 'stop';
        const logDate = this.getLogDate();
        clearTimeout(this.transferInterval);
        this.transferInterval = null;
        this.logs.push(`[${logDate}] 사진생성을 종료합니다.`);
      }
    },
  },
});
