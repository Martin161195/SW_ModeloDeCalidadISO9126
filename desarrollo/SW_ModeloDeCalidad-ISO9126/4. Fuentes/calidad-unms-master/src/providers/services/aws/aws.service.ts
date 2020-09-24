import { Injectable } from '@angular/core';
declare const AWS: any;
@Injectable({
  providedIn: 'root'
})
export class AwsService {
  public aws = AWS;
  constructor() {
    this.aws.config.update({
      region: 'us-east-1',
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:ec212406-98e5-4ab3-bee5-7b63b3ab11a8'
      })
    });
  }

  getS3(): any {
    const s3 = new this.aws.S3({
      params: {
        Bucket: 'salon.assets.vertemejor.com'
      }
    });

    return s3;
  }

}
