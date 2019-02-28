import { TestBed } from '@angular/core/testing';
import { OmdbApiService } from './omdb-api.service';
describe('OmdbApiService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(OmdbApiService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=omdb-api.service.spec.js.map