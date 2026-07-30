# Gate & Grid — Parking Ops Console

A React + Tailwind (v4) + Vite frontend for the ParkingLotManager Spring Boot API.

## Run it

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and point `VITE_API_BASE_URL` at your backend if it's not on `http://localhost:8080/api/parking`.

## What it does

- Pick a lot, see its open stalls as a painted-grid layout (live from `GET /slots`)
- Click a stall to check a vehicle in — registers the vehicle, then issues a ticket, shown as a torn-stub receipt
- Release a stall by lot + stall number when a vehicle exits

## Backend changes needed to fully match this frontend

This was built against the controller/service from our conversation. Two things there don't currently line up with what a browser can call:

1. **`/ticket` needs to be `@PostMapping`, not `@GetMapping`.** Browsers can't send a body on a GET request, so this client calls it as `POST /api/parking/ticket`. Update the controller mapping to match.
2. **No route exposes `ParkingService.deleteSlot`.** The release panel expects `DELETE /api/parking/slot?parkingLotName=..&slotNumber=..`. Add something like:

```java
@DeleteMapping("/slot")
public ResponseEntity<Void> releaseSlot(
        @RequestParam String parkingLotName,
        @RequestParam String slotNumber) {
    parkingService.deleteSlot(parkingLotName, slotNumber);
    return ResponseEntity.noContent().build();
}
```

Until both exist, check-in and release will fail with 404/405s against the current controller.

## Also worth knowing

- CORS: add `@CrossOrigin` (or a global `WebMvcConfigurer`) on the controller for `http://localhost:5173`, or the dev server's fetch calls will be blocked by the browser.
- There's no endpoint that returns *all* slots (occupied + free) for a lot, only free ones — so this UI can't show occupied stalls on the grid, only let you release one by number. If you want a full occupancy map, that's a backend addition (a `GET /slots/all?parkingLotName=..` returning every `ParkingSlot` for the lot).
