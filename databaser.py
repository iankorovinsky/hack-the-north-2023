import os
import psycopg2

conn = psycopg2.connect("postgresql://htn_admin:y1EJPXCfbpvT03uaTpVsyw@hack-the-north-2023-5466.g8z.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full")

with conn.cursor() as cur:
    cur.execute("SELECT now()")
    res = cur.fetchall()
    conn.commit()
    print(res)