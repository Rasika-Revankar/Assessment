import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';

import { DetailService } from './detail.service';

describe('DetailService', () => {
  let service: DetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DetailService]
    });

    service = TestBed.get(DetailService);
    httpMock = TestBed.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should retrieve posts from the API via get', () => {
    const dummyPosts = [{
      userId: '1',
      id: '1',
      body: 'Hello world',
      title: 'Testing angular'
    },
    {
      userId: '1',
      id: '1',
      body: 'Hello world',
      title: 'Testing angular 2'
    }];
    service.usersPostData().subscribe(posts => {
      expect(posts.length).toBe(2);
      exports(posts).toEqual(dummyPosts);
    });
    const request = httpMock.expectOne(`${service.hostUrl}/posts`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
  });

  it('should be created', () => {
    const serviceDetail: DetailService = TestBed.get(DetailService);
    expect(serviceDetail).toBeTruthy();
  });
});
