import { request2Get } from '@/utils/request'

export function toTest() {
  return request2Get({
    url: '/test',
    data: {}
  })
}
