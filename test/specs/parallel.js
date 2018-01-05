import { expect } from 'chai'
import { clean, run } from '../helper'

describe('parallel', () => {
    beforeEach(clean)

    it('should run several suites in parallel', () => {
        return run(['broken', 'failing']).then((results) => {
            expect(results).to.have.lengthOf(2)
            const startTimes = results.map(result => parseInt(result('test-case').attr('start'), 10))
            const stopTimes = results.map(result => parseInt(result('test-case').attr('stop'), 10))
            expect(stopTimes[0]).to.be.above(startTimes[1])
            expect(stopTimes[1]).to.be.above(startTimes[0])
        })
    })
})
