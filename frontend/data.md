{
  "users": [
    {
      "id": "00000000-0000-0000-0000-000000000001",
      "email": "john.doe@hospital.com",
      "password_hash": "hashed_password_123",
      "first_name": "John",
      "last_name": "Doe",
      "role": "Nurse",
      "department": "00000000-0000-0000-0000-000000000101",
      "employee_id": "EMP-12345",
      "hourly_rate": 35.50,
      "created_at": "2024-01-15T08:00:00Z"
    }
  ],
  
  "departments": [
    {
      "id": "00000000-0000-0000-0000-000000000101",
      "name": "Emergency Room",
      "location": "00000000-0000-0000-0000-000000000201",
      "manager_id": "00000000-0000-0000-0000-000000000001",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  
  "locations": [
    {
      "id": "00000000-0000-0000-0000-000000000201",
      "name": "Main Hospital Building",
      "address": "123 Medical Drive, Cityville",
      "wing": "West Wing",
      "floor": 3,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  
  "shift_templates": [
    {
      "id": "00000000-0000-0000-0000-000000000301",
      "name": "Day Shift ER",
      "start_time": "08:00:00",
      "end_time": "16:00:00",
      "department_id": "00000000-0000-0000-0000-000000000101",
      "location_id": "00000000-0000-0000-0000-000000000201",
      "min_staff_required": 5,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  
  "available_shifts": [
    {
      "id": "00000000-0000-0000-0000-000000000401",
      "template_id": "00000000-0000-0000-0000-000000000301",
      "shift_date": "2024-03-20",
      "start_time": "2024-03-20T08:00:00Z",
      "end_time": "2024-03-20T16:00:00Z",
      "status": "open",
      "hourly_rate": 37.00,
      "department_id": "00000000-0000-0000-0000-000000000101",
      "location_id": "00000000-0000-0000-0000-000000000201",
      "created_at": "2024-03-01T00:00:00Z"
    }
  ],
  
  "user_shift_preferences": [
    {
      "id": "00000000-0000-0000-0000-000000000501",
      "user_id": "00000000-0000-0000-0000-000000000001",
      "preferred_locations": ["00000000-0000-0000-0000-000000000201"],
      "preferred_departments": ["00000000-0000-0000-0000-000000000101"],
      "preferred_shift_types": ["Morning", "Day"],
      "min_hourly_rate": 32.00,
      "max_distance": 50,
      "auto_apply": true,
      "notification_preferences": {"email": true, "sms": false}
    }
  ],
  
  "shift_assignments": [
    {
      "id": "00000000-0000-0000-0000-000000000601",
      "shift_id": "00000000-0000-0000-0000-000000000401",
      "user_id": "00000000-0000-0000-0000-000000000001",
      "status": "accepted",
      "clock_in": "2024-03-20T07:58:00Z",
      "clock_out": "2024-03-20T16:02:00Z",
      "actual_hours_worked": 8.07
    }
  ],
  
  "monthly_shift_commitments": [
    {
      "id": "00000000-0000-0000-0000-000000000701",
      "user_id": "00000000-0000-0000-0000-000000000001",
      "month": 3,
      "year": 2024,
      "min_shifts": 15,
      "max_shifts": 20,
      "status": "approved"
    }
  ],
  
  "shift_applications": [
    {
      "id": "00000000-0000-0000-0000-000000000801",
      "shift_id": "00000000-0000-0000-0000-000000000401",
      "user_id": "00000000-0000-0000-0000-000000000001",
      "status": "accepted"
    }
  ],
  
  "notifications": [
    {
      "id": "00000000-0000-0000-0000-000000000901",
      "user_id": "00000000-0000-0000-0000-000000000001",
      "type": "shift_update",
      "title": "Shift Accepted",
      "message": "Your shift on March 20th has been approved",
      "read": true
    }
  ],
  
  "user_certifications": [
    {
      "id": "00000000-0000-0000-0000-000000000a01",
      "user_id": "00000000-0000-0000-0000-000000000001",
      "name": "Advanced Cardiac Life Support",
      "issuing_authority": "American Heart Association",
      "issue_date": "2023-01-15",
      "expiry_date": "2025-01-15",
      "status": "active"
    }
  ]
}