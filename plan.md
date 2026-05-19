# Project Plan: University Accounting and Exam Management System

## Scope Summary
A specialized web application for managing university accounting, student enrollment, and automated exam room planning. The system will handle fee tracking (tuition, installments), eligibility lists for exams based on payment thresholds, and a complex room seating algorithm that prevents students from the same major from sitting together.

**Key Features:**
- **User Authentication & RBAC:** Secure login with role-based access control (Admin vs. Staff).
- **Accounting Dashboard:** Excel-like interface for managing payments (Inscription, Tranche 1-4, Total, Balance).
- **Major/Program Management:** Pre-configured list of Francophone and Anglophone majors.
- **Student Management:** Automatic ID generation (e.g., CGE 001) and eligibility tracking.
- **Exam Room Planner:** Automated seat assignment with specific logic (no same-major neighbors, level-based grouping).
- **Reporting:** PDF export for room plans and student lists.

## Persistence Strategy
- **Client-Side Only:** Since no database is available, all data will be persisted using `localStorage`. 
- **Data Export/Import:** Include a feature to export/import JSON data to allow "backups" or "sharing" since local storage is browser-bound.

## Affected Areas
- **Frontend (React):** Main application logic and UI.
- **State Management:** Complex local state for accounting and room logic.
- **Logic Layer:** Algorithms for room seating and eligibility calculations.
- **Exports:** PDF generation logic.

---

## Phase 1: Foundation & Auth (frontend_engineer)
- Set up project structure and routing (Home, Login, Dashboard, Accounting, Rooms).
- Implement a mock authentication system with role-based access.
- Create the data schema for Majors, Students, and Rooms.
- Implement `localStorage` synchronization hooks.

## Phase 2: Accounting & Student Management (frontend_engineer)
- Build the "Excel-like" accounting table.
- Implement column-based calculations (Total Paid, Remaining Balance).
- Implement Student creation with automatic ID generation based on major abbreviations.
- Add fields for Polos and Student IDs (livrets).
- Create filters for Francophone/Anglophone sections and levels.

## Phase 3: Exam Eligibility & Exam Room Logic (frontend_engineer)
- Create a configuration panel to set "Payment Thresholds" for different exam types (CC, Normal, Resit).
- Develop the Seat Assignment Algorithm:
    - Inputs: Room dimensions (rows/columns), Selected Students (eligible).
    - Logic: Pairs of students per bench; no two students of the same major on the same bench.
    - Logic: Level grouping (Levels 1&2 together; Levels 3, 4, & 5 separately).
- Visual Room Map: Interactive or static display of the generated seating plan.

## Phase 4: Exports & Final Polish (quick_fix_engineer)
- Integrate a PDF export library (e.g., `jspdf` or `react-to-print`).
- Generate PDF reports for:
    - Room seating plans (with IDs).
    - Eligible student lists.
    - Debtor (insolvable) lists.
- Final UI/UX adjustments and accessibility checks.

---

## Assumptions & Open Questions
- **Data Persistence:** Does the user understand that clearing browser cache will delete the data? (Added JSON export as a safeguard).
- **Room Dimensions:** Assumed rooms are manually adjustable in terms of rows/columns as per request.
- **Language:** The UI will primarily be in French as per the request language.

## Downstream Owner Assignments
- **Phase 1-3:** `frontend_engineer` (Core logic and complex UI).
- **Phase 4:** `quick_fix_engineer` (Reporting and UI refinements).
