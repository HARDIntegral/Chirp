#include <netinet/in.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <stdbool.h>
#include <limits.h>
#include <pthread.h>

#include "queue.h"

#define SERVER_PORT 8000
#define BUFF_SIZE   4096
#define SOCKET_ERR  (-1)
#define BACKLOG     1

#define THREAD_POOL_SIZE 16
pthread_t thread_pool[THREAD_POOL_SIZE];
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;

void* connection_handler(void* p_client_socket);
int check(int exp, const char* msg);
void* thread_function(void* arg);

int main() {
    return 0;
}