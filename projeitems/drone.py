"""Vehicle Routing Problem"""
from __future__ import print_function
from ortools.constraint_solver import pywrapcp
from ortools.constraint_solver import routing_enums_pb2

###########################
# Problem Data Definition #
###########################

def create_data(locations,number_of_routes):
  """Stores the data for the problem"""
  # Locations
  num_vehicles = number_of_routes
  depot = 0

  num_locations = len(locations)
  dist_matrix = {}

  for from_node in range(num_locations):
    dist_matrix[from_node] = {}

    for to_node in range(num_locations):
      dist_matrix[from_node][to_node] = (
        manhattan_distance(
          locations[from_node],
          locations[to_node]))

  return [num_vehicles, depot, locations, dist_matrix]

###################################
# Distance callback and dimension #
###################################


def manhattan_distance(position_1, position_2):
  """Computes the Manhattan distance between two points"""
  return (abs(position_1[0] - position_2[0]) +
          abs(position_1[1] - position_2[1]))

def CreateDistanceCallback(dist_matrix):

  def dist_callback(from_node, to_node):
    return dist_matrix[from_node][to_node]

  return dist_callback


def add_distance_dimension(routing, dist_callback):
  """Add Global Span constraint"""
  distance = "Distance"
  maximum_distance = 3000
  routing.AddDimension(
    dist_callback,
    0, # null slack
    maximum_distance, # maximum distance per vehicle
    True, # start cumul to zero
    distance)
  distance_dimension = routing.GetDimensionOrDie(distance)
  # Try to minimize the max distance among vehicles.
  distance_dimension.SetGlobalSpanCostCoefficient(100)

################
# Print Routes #
################

def print_routes(num_vehicles, locations, routing, assignment):
  """Prints assignment on console"""
  total_dist = 0

  for vehicle_id in range(num_vehicles):
    index = routing.Start(vehicle_id)
    plan_output = 'Route for route {0}:\n'.format(vehicle_id)
    route_dist = 0

    while not routing.IsEnd(index):
      node = routing.IndexToNode(index)
      next_node = routing.IndexToNode(
        assignment.Value(routing.NextVar(index)))
      route_dist += manhattan_distance(
        locations[node],
        locations[next_node])
      plan_output += ' {node} -> '.format(
        node=node)
      index = assignment.Value(routing.NextVar(index))

    node = routing.IndexToNode(index)
    total_dist += route_dist
    plan_output += ' {node}\n'.format(
      node=node)
    plan_output += 'Distance of route {0}: {dist}\n'.format(
      vehicle_id,
      dist=route_dist)
    print(plan_output)
  print('Total distance of all routes: {dist}'.format(dist=total_dist))

########
# Main #
########

def find_route(locations,source_node,destination_node,number_of_routes):
  """Entry point of the program"""
  # Create data.
  [num_vehicles, depot, locations, dist_matrix] = create_data(locations,number_of_routes)
  num_locations = len(locations)
  # Create Routing Model
  start_locations = [source_node for x in range(num_vehicles)]
  end_locations = [destination_node for x in range(num_vehicles)]
  routing = pywrapcp.RoutingModel(num_locations, num_vehicles, start_locations, end_locations)

  dist_callback = CreateDistanceCallback(dist_matrix)
  add_distance_dimension(routing, dist_callback)
  routing.SetArcCostEvaluatorOfAllVehicles(dist_callback)
  search_parameters = pywrapcp.RoutingModel.DefaultSearchParameters()
  search_parameters.first_solution_strategy = (
    routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)

  # Solve the problem.
  assignment = routing.SolveWithParameters(search_parameters)
  print_routes(num_vehicles, locations, routing, assignment)


locations=[(7.748888888888889,76.50611111111111),
(18.289166666666667,84.11388888888888),
(25.88111111111111,75.44),
(20.546666666666667,77.41555555555556),
(23.183888888888887,75.99888888888889),
(16.52611111111111,70.83305555555555),
(21.871666666666666,81.99805555555555)]

source_node=1
destination_node=6
number_of_routes=5

find_route(locations,source_node,destination_node,number_of_routes)
