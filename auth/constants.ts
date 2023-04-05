export const jwtConstants = {
  secret: '2mmdmdkkjuhu',
};


@Controller()
export class ArduinoController {
  @Get('arduino')
  async getArduinoData(): Promise<any> {
    const port = new SerialPort('/dev/ttyACM0', {
      baudRate: 9600,
    });

    return new Promise((resolve, reject) => {
      port.on('open', () => {
        console.log('Connection opened.');

        // Code to read data from the Arduino WebSerial server goes here
      });

      port.on('data', (data) => {
        console.log('Data received:', data.toString());
      });

      port.on('close', () => {
        console.log('Connection closed.');
      });
      const decoder = new TextDecoderStream();
      port.on('error', (err) => {
        console.error('Error:', err);
        reject(err);
      });
    });
  }
}
